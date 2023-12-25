const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Define endpoint to receive quiz responses
app.post('/analyze-skin', (req, res) => {
  const { Q1, Q2, Q3, Q4, Q5, Q6, Q7 } = req.body;

  // Determine skin type based on quiz responses
  const skinType = determineSkinType({ Q1, Q2, Q3, Q4, Q5, Q6, Q7 });

  // Send the determined skin type as a response
  res.json({ skinType });
});

// Define skin types and their descriptions
const skinTypes = {
  normal: 'Normal skin is well balanced and not too oily or dry',
  oily: 'Oily skin is shiny and prone to acne and enlarged pores',
  dry: 'Dry skin is dull and flaky and may feel tight or itchy',
  combination: 'Combination skin has oily areas (usually the T-zone) and dry areas (usually the cheeks)',
  sensitive: 'Sensitive skin is easily irritated by products or environmental factors and may experience redness, itching, or burning'
};

// Function to determine skin type based on quiz responses
function determineSkinType(quizAnswers) {
  const { Q1, Q2, Q3, Q4, Q5, Q6, Q7 } = quizAnswers;

  if (Q1 === 'a1' && Q2 === 'a1' && Q3 === 'a1' && Q4 === 'a1' && Q5 === 'a1' && Q6 === 'a1' && Q7 === 'a1') {
    return 'dry';
  } else if (Q1 === 'a2' && Q2 === 'a2' && Q3 === 'a2' && Q4 === 'a2' && Q5 === 'a2' && Q6 === 'a2' && Q7 === 'a2') {
    return 'oily';
  } else if (Q1 === 'a3' && Q2 === 'a3' && Q3 === 'a3' && Q4 === 'a3' && Q5 === 'a3' && Q6 === 'a3' && Q7 === 'a3') {
    return 'combination';
  } else if ((Q1 === 'a2' || Q1 === 'a4') && Q2 === 'a4' && Q3 === 'a4' && Q4 === 'a4' && Q5 === 'a4' && Q6 === 'a4' && Q7 === 'a4') {
    return 'sensitive';
  } else if (Q1 === 'a4' && Q2 === 'a1' && Q3 === 'a5' && Q4 === 'a5' && Q5 === 'a5' && Q6 === 'a5' && Q7 === 'a5') {
    return 'normal';
  } else {
    return 'combination'; // Default to combination if no specific conditions met
  }
}

// Function to display quiz result
function showResult(skinType) {
  const description = skinTypes[skinType];
  console.log(`Your skin type is ${skinType}`);
  console.log(description);
}

// Example usage:
const quizAnswers = {
  Q1: 'a1',
  Q2: 'a1',
  Q3: 'a1',
  Q4: 'a1',
  Q5: 'a1',
  Q6: 'a1',
  Q7: 'a1'
};

const userSkinType = determineSkinType(quizAnswers);
showResult(userSkinType);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
