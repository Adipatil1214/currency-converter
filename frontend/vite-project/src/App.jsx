import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [formData, setformData] = useState({
    from: "",
    to: "",
    amount: "",
  });
  const [result, setresult] = useState(null);
  const [error, seterror] = useState(null);

  const currencyCodes = ["USD", "EUR", "GBP", "GHS", "JPY", "CAD", "BSD"];
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setformData((PrevData)=>({
      ...PrevData,
      [name]:value,
    }));
  }


  const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api",
        formData)
      setresult(response?.data);
      seterror('')


    } catch (error) {
      seterror(
        "ERROR",
        error?.response ? error?.response.data : error?.message
      )
      console.log(error);
      
    }
  }
  return (
    <>
      <h1>Currency Generator</h1>
      <form onSubmit={handleSubmit}>
        <select
          name="from"
          value={formData.from}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select From Currency</option>
          {currencyCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <select
          name="to"
          value={formData.to}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select to Currency</option>
          {currencyCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <input
          placeholder="Enter Amount.."
          name="amount"
          onChange={handleChange}
          type="number"
          className="Input"
        />
        <button type="submit">Convert</button>
      </form>

      {result && (<div>
          <p>Converted Amount: {result.convertedAmount} {result.target}</p>
          <p>Conversion Rate: {result.conversionRate}</p>
        </div>)}

       {error && <p className="error">Error: {error}</p>}


    </>
  );
}

export default App;
