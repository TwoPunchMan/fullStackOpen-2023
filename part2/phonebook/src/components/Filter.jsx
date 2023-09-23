const Filter = ({ value, changeFunction }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={changeFunction} />
    </div>
  )
}

export default Filter;
