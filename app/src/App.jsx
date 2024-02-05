import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './components/SearchResult/SearchResult';

export const BASE_URL = "http://localhost:9000";

const App = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");



  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn('all');
      return;
    }
    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all"
    },
    {
      name: "Breakfast",
      type: "Breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },
    {
      name: "Dinner",
      type: "dinner"
    }
  ];


  if (error) return <div>{error}</div>;
  if (loading) return <div>loading...</div>;

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue == "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));

    setFilteredData(filter);
  };



  return (
    <>
      <Container>
        <TopContainer>
          <div>
            <img src="/logo.png" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder='Search Food...' />
          </div>
        </TopContainer>
        <FilterContainer>
          {
            filterBtns.map((value) => (
              <Button isSelected={selectedBtn === value.type} key={value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>
            ))
          }
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;


export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search{
    input{
      background: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      font-size: 16px;
      height: 40px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }

`;


const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 14px;
  padding-bottom: 40px;
  `;

export const Button = styled.button`
  background: ${({isSelected}) => (isSelected ? "#e03939" : "#ff4343")};
  outline: 1px solid ${({isSelected}) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  gap: 20px;
  cursor: pointer;
  &:hover{
    background-color: #6d1b1b;
  }
`;