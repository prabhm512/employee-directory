import './App.css';
import Jumbotron from './components/Jumbotron';
import Search from './components/Search';
import EmpTable from './components/EmpTable';

function App() {
  return (
    <div className="App">
      <Jumbotron></Jumbotron>
      <Search></Search>
      <EmpTable></EmpTable>
    </div>
  );
}

export default App;
