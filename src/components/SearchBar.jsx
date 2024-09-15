export default function SearchBar({ onSubmit }) {
  return (
    <header>
      <form onSubmit={onSubmit}>
        <input
          name="input"
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
