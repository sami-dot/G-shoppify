import { useState } from "react";
import useUIStore from "../../../store/uiStore";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useCreateProduct } from "../../../lib/react-query/queries";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const INITIAL_FORMDATA = {
  name: "",
  description: "",
  image: "",
  category: "",
};
export const AddProductForm = () => {
  const showCartList = useUIStore((state) => state.showCartList);

  const [formData, setFormData] = useState(INITIAL_FORMDATA);
  const [customCategory, setCustomCategory] = useState("");
  const inputChangeHandler = (name) => (e) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const { mutateAsync: createProduct, isPending: isLoadingCreate } =
    useCreateProduct();

  // handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoadingCreate) return;
    try {
      if (formData.category === "custom" && customCategory === "") {
        toast.error("category is Required");
        return;
      }
      if (formData.category === "custom" && customCategory !== "") {
        const { data } = await createProduct({
          ...formData,
          category: customCategory,
        });
        toast.success(data?.message);
        setFormData(INITIAL_FORMDATA);
      } else {
        const { data } = await createProduct(formData);
        toast.success(data?.message);
        setFormData(INITIAL_FORMDATA);
      }
    } catch (error) {
      if (error?.response?.data?.errors.length > 0) {
        let errors = error?.response?.data?.errors;
        errors.forEach((err) => {
          let val = Object.values(err);
          toast.error(val[0]);
        });
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  const onCancel = () => {
    showCartList();
  };
  return (
    <div className="mx-3 h-full overflow-hidden">
      <h2 className="text-3xl font-semibold ">Add a new item</h2>
      <form
        onSubmit={onSubmitHandler}
        className="flex h-full  flex-col  gap-5 pb-20 pt-6">
        <div className="flex flex-col">
          <label className="mb-2 text-sm" htmlFor="name">
            Name
          </label>
          <input
            disabled={isLoadingCreate}
            className="w-full rounded-xl border-2 border-clrCottonSeed px-2 py-2 text-sm focus:outline-clrOrangePeel"
            onChange={inputChangeHandler("name")}
            value={formData.name}
            autoComplete="off"
            name="name"
            id="name"
            type="text"
            placeholder="Enter a name"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-sm" htmlFor="description">
            Note (optional)
          </label>
          <textarea
            disabled={isLoadingCreate}
            className="w-full resize-none  rounded-xl border-2 border-clrCottonSeed px-2 py-3 text-sm focus:outline-clrOrangePeel"
            onChange={inputChangeHandler("description")}
            value={formData.description}
            autoComplete="off"
            id="description"
            name="description"
            cols="10"
            rows="4"></textarea>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-sm" htmlFor="image">
            Image url (optional){" "}
          </label>
          <input
            disabled={isLoadingCreate}
            onChange={inputChangeHandler("image")}
            value={formData.image}
            autoComplete="off"
            className="w-full rounded-xl border-2 border-clrCottonSeed px-2 py-2 text-sm focus:outline-clrOrangePeel"
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-sm" htmlFor="category">
            Category
          </label>
          {/* CUSTOM ADD LOGIC REMAINING */}
          <select
            disabled={formData.category === "custom" || isLoadingCreate}
            onChange={inputChangeHandler("category")}
            value={formData.category}
            className="w-full rounded-xl  border-2 border-clrCottonSeed px-2 py-2 text-sm focus:outline-clrOrangePeel"
            name="category"
            id="category">
            <option value="" disabled>
              ---select category---
            </option>
            <option value="Fruit and Vegetables">Fruit and vegetables</option>
            <option value="Meat and Fish">Meat and Fish</option>
            <option value="Beverages">Beverages</option>
            <option value="custom">Select Custom</option>
          </select>
        </div>
        {formData.category === "custom" && (
          <div className="relative">
            <input
              disabled={isLoadingCreate}
              onChange={(e) => setCustomCategory(e.target.value)}
              value={customCategory}
              autoComplete="off"
              className="w-full rounded-xl border-2 border-clrCottonSeed px-2 py-2 text-sm focus:outline-clrOrangePeel"
              type="text"
              placeholder="Enter Custom Category"
            />
            <FontAwesomeIcon
              onClick={() => setFormData((prev) => ({ ...prev, category: "" }))}
              className="absolute right-2 top-2 cursor-pointer border px-2 py-1 text-clrGranite hover:text-clrGravel"
              icon={faClose}
            />
          </div>
        )}
        <div className="mt-auto flex justify-center gap-5">
          <button
            type="button"
            disabled={isLoadingCreate}
            onClick={onCancel}
            className="w-24 rounded-2xl border-2 py-3 disabled:cursor-not-allowed disabled:opacity-60">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoadingCreate}
            className={twMerge(
              "w-24 rounded-2xl border-2  bg-clrOrangePeel py-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
            )}>
            {isLoadingCreate ? (
              <LoaderCircle className="mx-auto animate-spin" />
            ) : (
              <p>Save</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
