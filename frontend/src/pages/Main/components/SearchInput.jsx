import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchInput(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="text-md flex items-center rounded-lg bg-white px-5 shadow-md ">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            className="border-0 px-3 py-3 text-gray-800 outline-none"
            autoComplete="off"
            type="text"
            placeholder="Search"
            {...props}
          />
        </div>
      </form>
    </>
  );
}
