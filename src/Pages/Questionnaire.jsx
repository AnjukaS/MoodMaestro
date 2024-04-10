// import React, { useState } from 'react';
// import "../styles/Moodstyles.css";  // Ensure this path is correct for your project structure

// function Questionnaire() {
//   const [moodScores, setMoodScores] = useState({
//     happy: 0,
//     sad: 0,
//     energetic: 0,
//     relaxed: 0,
//   });
  
//   const handleSliderChange = (mood) => (event) => {
//     setMoodScores({ ...moodScores, [mood]: parseInt(event.target.value, 10) });
//   };

//   const sendMoodToBackend = async (dominantMood) => {
//     try {
//       const response = await fetch('https://your-backend-endpoint.com/moods', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mood: dominantMood }),
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log(data); // Handle the response data
//       alert(`Mood successfully sent to the backend: ${dominantMood}`);
//     } catch (error) {
//       console.error("There was an error sending the mood to the backend:", error);
//     }
//   };

//   const getMoodRecommendation = () => {
//     const maxScore = Math.max(...Object.values(moodScores));
//     const moodsWithMaxScore = Object.keys(moodScores).filter((mood) => moodScores[mood] === maxScore);
    
//     if (moodsWithMaxScore.length > 1) {
//       alert("Please adjust the sliders so that one mood is more dominant than the others.");
//       return; // Stop execution if more than one mood is dominant
//     } else {
//       const dominantMood = moodsWithMaxScore[0];
//       alert(`Your dominant mood is: ${dominantMood}. Sending to backend...`);
//       sendMoodToBackend(dominantMood); // Send the mood to the backend
//     }
//   };

//   return (
//     <div className="questionnaire-page">
//       <h1>How are you feeling today?</h1>
//       <div className="question">
//         <p>How happy do you feel right now?</p>
//         <input type="range" min="0" max="10" value={moodScores.happy} onChange={(e) => handleSliderChange('happy')(e)} />
//       </div>
//       <div className="question">
//         <p>How much do you feel like crying right now?</p>
//         <input type="range" min="0" max="10" value={moodScores.sad} onChange={(e) => handleSliderChange('sad')(e)} />
//       </div>
//       <div className="question">
//         <p>How physically and mentally energized do you feel right now?</p>
//         <input type="range" min="0" max="10" value={moodScores.energetic} onChange={(e) => handleSliderChange('energetic')(e)} />
//       </div>
//       <div className="question">
//         <p>How much tension do you carry in your body?</p>
//         <input type="range" min="0" max="10" value={moodScores.relaxed} onChange={(e) => handleSliderChange('relaxed')(e)} />
//       </div>
//       <button onClick={getMoodRecommendation}>Get Recommendation</button>
//     </div>
//   );
// }

// export default Questionnaire;



import React, { useState } from 'react';
import "../styles/Moodstyles.css";

function Questionnaire() {
  const [moodScores, setMoodScores] = useState({
    Happy: 0,
    Sad: 0,
    Energetic: 0,
    Relaxed: 0,
  });
  const [songs, setSongs] = useState([]); // Stores the song recommendations
  const [isLoading, setIsLoading] = useState(false); // Tracks whether recommendations are being loaded
  const [showQuestionnaire, setShowQuestionnaire] = useState(true); // Whether to show the questionnaire or the results
  const [dominantMoodMessage, setDominantMoodMessage] = useState(""); // Message to display the dominant mood
  
  const handleSliderChange = (mood) => (event) => {
    setMoodScores({ ...moodScores, [mood]: parseInt(event.target.value, 10) });
  };

  const getMoodRecommendation = async () => {
    const maxScore = Math.max(...Object.values(moodScores));
    const moodsWithMaxScore = Object.keys(moodScores).filter((mood) => moodScores[mood] === maxScore);
    
    if (moodsWithMaxScore.length > 1) {
      alert("You seem to have multiple dominant moods. Please adjust the sliders so that one mood stands out more clearly.");
      return; // Early return to stop execution if there's a tie
    } 
    
    const dominantMood = moodsWithMaxScore[0];
    setDominantMoodMessage(`Your dominant mood is: ${dominantMood}. Fetching recommendations...`); // Update the dominant mood message
    
    setIsLoading(true);
    setShowQuestionnaire(false); // Hide the questionnaire to show the message and recommendations
    
    try {
      const recommendations = await fetchRecommendations(dominantMood);
      setSongs(recommendations);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      setDominantMoodMessage("Failed to fetch recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchRecommendations = async (mood) => {
  //   // Replace with your actual API call logic
  //   const response = await fetch(`http://localhost:5000/getsongs${mood}`);
  //   if (!response.ok) {
  //     throw new Error('Problem fetching recommendations');
  //   }
  //   const data = await response.json();
  //   return data.songs; // Assuming the response contains an array of songs
  // };

  const fetchRecommendations = async (mood) => {
    try {
      const response = await fetch(`http://localhost:5000/getsongs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood: mood }),
      });
  
      if (!response.ok) {
        throw new Error('Problem fetching recommendations');
      }
  
      const data = await response.json();
      setSongs(data.songs); // Update with data.songs.songs
      console.log(data.songs);
      return data.songs; // Return data.songs.songs
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      throw error;
    }
  };


 

  return (
    <div className="questionnaire-page">
      {isLoading && <p>Loading recommendations...</p>}
      {!isLoading && !showQuestionnaire && (
        <>
          <p>{dominantMoodMessage}</p> {/* Display the dominant mood message */}
          <div>
            <h2>Recommended Songs for Your Mood:</h2>
            <ul>
              {songs.map((song, index) => (
                <li key={index}><>
                  {song.song}
                  {"   "}
                  <a href={song.link}>
                    {song.link}
                  </a>
                </></li>
              ))}
            </ul>
          </div>
        </>
      )}
      {!isLoading && showQuestionnaire && (
        <>
          <h1>How are you feeling today?</h1>
          {/* Repeat for each mood */}
          <div className="question">
            <p>How happy do you feel right now?</p>
            <input
              type="range"
              min="0"
              max="10"
              value={moodScores.Happy}
              onChange={handleSliderChange('Happy')}
            />
          </div>
          <div className="question">
            <p>How much do you feel like crying right now?</p>
            <input
              type="range"
              min="0"
              max="10"
              value={moodScores.Sad}
              onChange={handleSliderChange('Sad')}
            />
          </div>
          <div className="question">
            <p>How physically and mentally energized do you feel right now?</p>
            <input
              type="range"
              min="0"
              max="10"
              value={moodScores.Energetic}
              onChange={handleSliderChange('Energetic')}
            />
          </div>
          <div className="question">
            <p>How much tension do you carry in your body?</p>
            <input
              type="range"
              min="0"
              max="10"
              value={moodScores.Relaxed}
              onChange={handleSliderChange('Relaxed')}
            />
          </div>
          <button onClick={getMoodRecommendation}>Get Recommendation</button>
        </>
      )}
    </div>
  );
}

export default Questionnaire;
