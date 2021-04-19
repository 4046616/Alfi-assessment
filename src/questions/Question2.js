import React, { useState } from 'react';

export default function Question2 (props) {
  // Situation: Create a search bar that filters items in the list as the user types.
  // Feel free to refactor as you feel necessary.

  const shoppingList = [
    'Peanut Butter',
    'Peas',
    'Butter',
    'Beans',
    'Eggs',
    'Quiche',
    'Cheese'
  ];
  // final results after search applied 
  const [resutlText, setResultText] = useState([...shoppingList]);

  // Filter list on effect 
  const onChange = (event)=> {
    const tempResult = shoppingList.filter((item)=> item.toLowerCase().includes(event.target.value.toLowerCase()));
    setResultText(tempResult);
  };

  return (
    <div>
      <input type="text" name="searchText" placeholder="Search" onChange={(event => onChange(event))}/>
      {resutlText.map((item, index)=> (
        <div key={index}>
            {item}
        </div>
      ))}
    </div>
  )
}
