function ListGroup() {
  const array = ["Brazil", "United States", "China", "Russia"];

  return (
    <>
      <h2>Countries</h2>
      <ul className="list-group">
        {array.map((country) => (
          <li key={country} className="list-group-item">
            {country}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
