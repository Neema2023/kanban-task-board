
function FilterBar({
  searchTerm,
  setSearchTerm,
  priority,
  setPriority
}) {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        aria-label="Filter by priority"
      >
        <option value="All">All Priorities</option>
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
    </div>
  );
}

export default FilterBar;
