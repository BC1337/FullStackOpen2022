import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = (props) => {
  const { good, neutral, bad, total, handleAverage, goodPercentage } = props;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Average" value={handleAverage()} />
        <StatisticLine text="Positive" value={`${goodPercentage()} %`} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const handleTotal = () => good + neutral + bad;

  const handleAverage = () => {
    const totalVotes = handleTotal();
    if (totalVotes === 0) {
      return 0;
    }
    const average = (good - bad) / totalVotes;
    return average;
  };

  const goodPercentage = () => {
    const totalVotes = handleTotal();
    if (totalVotes === 0) {
      return 0;
    }
    const goodPercent = (good / totalVotes) * 100;
    const roundedPercent = Math.round(goodPercent);
    return roundedPercent;
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={handleTotal()}
        handleAverage={handleAverage}
        goodPercentage={goodPercentage}
      />
    </div>
  );
};

export default App;
