
const healthRecommendations = {
    headache: [
        "Stay hydrated by drinking plenty of water.",
        "Rest in a quiet and dark room.",
        "Consider taking over-the-counter pain relievers.",
        "If headaches persist, consult a healthcare provider.",
        "Practice relaxation techniques, like deep breathing or meditation.",
        "Avoid triggers such as caffeine, alcohol, and strong odors."
    ],
    fatigue: [
        "Ensure you are getting enough sleep (7-9 hours per night).",
        "Stay hydrated and eat a balanced diet.",
        "Incorporate regular exercise into your routine.",
        "If fatigue persists, consult a healthcare provider.",
        "Limit caffeine intake, especially in the afternoon and evening.",
        "Take short breaks during prolonged tasks to reduce fatigue."
    ],
    nausea: [
        "Try ginger tea or peppermint to soothe your stomach.",
        "Eat smaller, more frequent meals instead of large meals.",
        "Stay hydrated, but avoid excessive fluid intake during meals.",
        "If nausea persists, consult a healthcare provider.",
        "Avoid strong odors that may trigger nausea.",
        "Practice deep breathing or relaxation exercises to ease discomfort."
    ],
    dizziness: [
        "Sit or lie down immediately to prevent falls.",
        "Avoid sudden head movements or standing up too quickly.",
        "Stay hydrated by drinking water.",
        "If dizziness persists or is severe, consult a healthcare provider.",
        "Eat small, frequent meals to maintain blood sugar levels.",
        "Limit caffeine and alcohol intake, which can cause dehydration."
    ],
    cough: [
        "Drink warm fluids like tea with honey to soothe your throat.",
        "Use a humidifier to keep air moist and reduce throat irritation.",
        "Avoid smoking or exposure to smoke.",
        "If cough persists, consider consulting a healthcare provider.",
        "Stay hydrated to thin mucus and reduce coughing.",
        "Try over-the-counter cough medications if appropriate."
    ],
    anxiety: [
        "Practice deep breathing exercises to calm your mind.",
        "Engage in regular physical activity to reduce stress.",
        "Limit caffeine, which can worsen anxiety symptoms.",
        "If anxiety interferes with daily life, consider professional support.",
        "Try mindfulness techniques such as meditation or yoga.",
        "Establish a routine to create a sense of stability."
    ],
    insomnia: [
        "Establish a consistent sleep schedule by going to bed at the same time every night.",
        "Avoid caffeine and heavy meals before bedtime.",
        "Create a calming bedtime routine to help relax.",
        "Limit screen time in the evening, as blue light can interfere with sleep.",
        "Keep your bedroom cool, dark, and quiet for better sleep.",
        "Consider relaxation exercises like progressive muscle relaxation."
    ],
    jointPain: [
        "Rest the affected joint and avoid excessive movement.",
        "Apply a warm or cold compress for relief.",
        "Engage in gentle stretching exercises to improve flexibility.",
        "Maintain a healthy weight to reduce pressure on joints.",
        "Consider over-the-counter pain relief if needed.",
        "If pain persists, consult a healthcare provider."
    ],
    skinRash: [
        "Keep the affected area clean and avoid scratching.",
        "Apply a soothing lotion, such as aloe vera or calamine.",
        "Wear loose, comfortable clothing to prevent irritation.",
        "Avoid exposure to potential allergens, such as certain soaps or perfumes.",
        "If the rash worsens, consult a healthcare provider.",
        "Consider using antihistamines if the rash is due to an allergy."
    ],
    fever: [
        "Stay hydrated by drinking plenty of water and fluids.",
        "Rest and allow your body to recover.",
        "Use a cool compress to bring down your temperature.",
        "Take over-the-counter fever reducers if needed.",
        "Wear lightweight, comfortable clothing.",
        "If fever persists for more than a few days, consult a healthcare provider."
    ],
    soreThroat: [
        "Gargle with warm salt water to reduce soreness.",
        "Drink warm teas and soups to soothe the throat.",
        "Avoid smoking or exposure to smoke.",
        "Use throat lozenges to provide temporary relief.",
        "Stay hydrated by drinking water throughout the day.",
        "Consult a healthcare provider if the sore throat persists."
    ],
    
};

export const getRecommendations = (symptom) => {
    return healthRecommendations[symptom] || ["No recommendations available for this symptom."];
};
