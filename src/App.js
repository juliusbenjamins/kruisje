import { useState, useEffect } from 'react';
import './App.css';

// #004A00 laaf groen

export const App = () => {
  // Variables
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState();

  // Functions
  const addScore = () => {
      console.log('score toevoegen..')
  }

  useEffect(() => {
    async function fetchData() {
      var data = require('./db/score.json');
      console.log(data)
      setScores(data.scores)
      setLoading(false);
		}
		fetchData()
	}, []);

  if (loading) {
		return (
			<div class="flex items-center flex-col shadow text-xs bg-white rounded-md">
				<div class="px-6 py-8 items-center">
					Laden....
				</div>
			</div>
		)
	} else {
    return (
      <div class="App">
        <div class='App-body'>
        <h1 class='mt-10 font-extrabold'>
          Het grote taphang scoreboard!
        </h1>
        <div class='m-10 py-10 px-5 bg-white shadow-2xl rounded-xl'>
          <div class='mb-10'>
            <div class="flex flex-col">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm font-light">
                      <thead class="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" class="px-6 py-4">Plaats</th>
                          <th scope="col" class="px-6 py-4">Naam</th>
                          <th scope="col" class="px-6 py-4">Tijd (s)</th>
                        </tr>
                      </thead>
                      <tbody class="p-10">
                      {scores.length > 0
                        ? scores.map((score) => (
                          <tr
                          class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                          <td class="whitespace-nowrap px-6 py-4 font-medium">{score.id}</td>
                          <td class="whitespace-nowrap px-6 py-4">{score.name}</td>
                          <td class="whitespace-nowrap px-6 py-4">{score.tijd}</td>
                        </tr>))
                        : <div class="flex items-center flex-col pl-10 m-2">
                          Geen scores gevonden...
                        </div>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <button className="border rounded-lg m-2 px-5 py-2 text-black 
                bg-white shadow-xl"
                onClick={() => addScore()}>
                Score Toevoegen
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
