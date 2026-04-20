import Column from "./Column";

/**
 *
 * @param {Object} props
 * @param {Array} props.columns
 * @param {Object} props.columns.id
 * @param {Array} props.columns.tasks
 * @param {String} props.columns.title
 * @returns {JSX.Element}
 */
const Workspace = ({ columns = [] }) => {
  return (
    <div className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
      {columns.map((item) => (
        <Column key={item.id} title={item.title} tasks={item.tasks} />
      ))}
      <button className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 self-start rounded-md p-3">
        + New column
      </button>
    </div>
  );
};

export default Workspace;
