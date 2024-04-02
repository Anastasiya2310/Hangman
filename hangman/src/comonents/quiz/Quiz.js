
const Quiz = ({ data, onQuestionChange }) => {
  const renderSelect = () => {
    let options = [];
    let uniqueCategories = new Set();
    data.forEach((item) => {
      if(!uniqueCategories.has(item.category)) {
        options.push(
          <option key={item.category} value={item.category}>
            {item.category}
          </option>
        )
        uniqueCategories.add(item.category);
      }
    })
    return options;
  }

  let getRandomQuestion = (selectedCategory) => {
    if(!data || data.length === 0) return null;
    const filteredQuestions = data.filter(
      (item) => item.category === selectedCategory
    );
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
  }

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const randomQuestion = getRandomQuestion(selectedCategory);
    onQuestionChange(randomQuestion);
  }

  return (
    <div>
      {data && (
        <select onChange={handleCategoryChange}>
          {renderSelect()}
        </select>
      )}
    </div>
  )
}

export default Quiz;