
interface MedicalCondition {
  keywords: string[];
  response: string;
}

const medicalKnowledgeBase: MedicalCondition[] = [
  {
    keywords: ['cough', 'coughing', 'dry cough', 'wet cough'],
    response: `For a cough, here are some general recommendations:

🏠 **Home Remedies:**
• Stay hydrated - drink warm water, herbal teas, or honey water
• Use a humidifier or breathe steam from a hot shower
• Try honey (1-2 teaspoons) - effective for dry coughs
• Gargle with warm salt water

⚠️ **When to see a doctor:**
• Cough persists for more than 3 weeks
• Blood in cough or sputum
• High fever (over 101°F/38.3°C)
• Difficulty breathing or wheezing
• Chest pain

💊 **Over-the-counter options:**
• Cough drops or lozenges
• Expectorants for wet coughs
• Cough suppressants for dry, irritating coughs

*Note: Avoid giving honey to children under 1 year old.*`
  },
  {
    keywords: ['cold', 'runny nose', 'stuffy nose', 'congestion', 'sneezing'],
    response: `For cold symptoms, here's what can help:

🏠 **Home Care:**
• Rest and get plenty of sleep
• Drink lots of fluids (water, warm broths, herbal teas)
• Use saline nasal sprays or rinses
• Apply warm compresses to your face for sinus pressure
• Gargle with warm salt water for sore throat

⏰ **Recovery Timeline:**
• Symptoms typically last 7-10 days
• Peak symptoms usually occur on days 2-3

💊 **Over-the-counter relief:**
• Decongestants for stuffy nose
• Antihistamines for runny nose and sneezing
• Pain relievers for aches and pains

⚠️ **See a doctor if:**
• Symptoms worsen after 7 days
• High fever (over 101.3°F/38.5°C)
• Severe headache or sinus pain
• Difficulty breathing`
  },
  {
    keywords: ['fever', 'temperature', 'hot', 'chills'],
    response: `For fever management:

🌡️ **Normal vs. Fever:**
• Normal: 97°F-99°F (36.1°C-37.2°C)
• Low-grade fever: 99.1°F-100.4°F (37.3°C-38°C)
• Fever: Above 100.4°F (38°C)

🏠 **Home Treatment:**
• Rest and stay hydrated
• Take acetaminophen or ibuprofen as directed
• Use cool compresses on forehead, wrists, or back of neck
• Wear light, breathable clothing
• Take lukewarm baths (avoid ice baths)

🚨 **Seek immediate medical care if:**
• Temperature above 103°F (39.4°C)
• Fever lasts more than 3 days
• Severe symptoms: difficulty breathing, chest pain, persistent vomiting
• Signs of dehydration
• Confusion or severe headache

💡 **Remember:** Fever is often your body's way of fighting infection.`
  },
  {
    keywords: ['headache', 'head pain', 'migraine'],
    response: `For headache relief:

🏠 **Immediate Relief:**
• Rest in a quiet, dark room
• Apply cold or warm compress to head/neck
• Stay hydrated - drink water
• Practice relaxation techniques
• Gentle head and neck massage

💊 **Over-the-counter options:**
• Acetaminophen, ibuprofen, or aspirin
• Follow package directions carefully
• Don't exceed recommended doses

⚠️ **Prevention Tips:**
• Maintain regular sleep schedule
• Eat regular meals
• Manage stress
• Limit caffeine and alcohol
• Stay hydrated

🚨 **Seek medical attention if:**
• Sudden, severe headache unlike any before
• Headache with fever, stiff neck, confusion
• Headache after head injury
• Progressive worsening over days/weeks
• Headache with vision changes or weakness`
  },
  {
    keywords: ['sore throat', 'throat pain', 'scratchy throat'],
    response: `For sore throat relief:

🏠 **Home Remedies:**
• Gargle with warm salt water (1/2 tsp salt in 1 cup water)
• Drink warm liquids: tea with honey, warm broth
• Use throat lozenges or hard candies
• Stay hydrated
• Use a humidifier

💊 **Over-the-counter relief:**
• Pain relievers (acetaminophen, ibuprofen)
• Throat numbing sprays
• Anti-inflammatory medications

⚠️ **See a doctor if:**
• Severe pain that makes swallowing difficult
• High fever (over 101°F/38.3°C)
• White patches or pus on tonsils
• Swollen lymph nodes in neck
• Symptoms persist more than a week
• Difficulty breathing or opening mouth

🦠 **Note:** Most sore throats are viral and resolve on their own. Strep throat requires antibiotic treatment from a doctor.`
  },
  {
    keywords: ['stomach pain', 'stomach ache', 'nausea', 'upset stomach'],
    response: `For stomach discomfort:

🏠 **Gentle Relief:**
• Rest and avoid solid foods temporarily
• Sip clear fluids: water, clear broths, electrolyte solutions
• Try the BRAT diet: Bananas, Rice, Applesauce, Toast
• Apply heat pad to stomach (low setting)
• Avoid dairy, fatty, or spicy foods

🌿 **Natural Options:**
• Ginger tea for nausea
• Peppermint tea for digestion
• Small, frequent sips of fluids

💊 **Over-the-counter help:**
• Antacids for heartburn
• Anti-diarrheal medication if needed
• Simethicone for gas and bloating

🚨 **Seek medical care if:**
• Severe, persistent pain
• Blood in vomit or stool
• High fever with abdominal pain
• Signs of dehydration
• Pain that worsens or moves to lower right abdomen
• Persistent vomiting`
  },
  {
    keywords: ['allergies', 'allergy', 'sniffling', 'watery eyes', 'itchy'],
    response: `For allergy management:

🏠 **Reduce Exposure:**
• Keep windows closed during high pollen days
• Use air purifiers with HEPA filters
• Wash bedding in hot water weekly
• Shower after being outdoors
• Clean house regularly to reduce dust mites

💊 **Over-the-counter relief:**
• Antihistamines (loratadine, cetirizine, fexofenadine)
• Nasal corticosteroid sprays
• Decongestants for short-term use
• Eye drops for itchy, watery eyes

🌿 **Natural Support:**
• Saline nasal rinses
• Local honey (may help with local pollen allergies)
• Quercetin supplements

⚠️ **See a doctor if:**
• Symptoms severely impact daily life
• Over-the-counter medications aren't effective
• You experience asthma-like symptoms
• Frequent sinus infections

🚨 **Emergency care for:**
• Difficulty breathing
• Swelling of face, lips, or throat
• Severe allergic reactions`
  }
];

export const getMedicalResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  // Find matching condition based on keywords
  for (const condition of medicalKnowledgeBase) {
    for (const keyword of condition.keywords) {
      if (input.includes(keyword)) {
        return condition.response;
      }
    }
  }

  // Default response for unrecognized queries
  return `I understand you're looking for health information. While I can help with common conditions like:

• Cough and cold symptoms
• Fever management
• Headaches
• Sore throat
• Stomach issues
• Allergies

I didn't recognize your specific question. Could you please rephrase it or ask about one of these common health topics?

**Important reminder:** For any serious symptoms, persistent conditions, or if you're unsure about your health, please consult with a healthcare professional. This chatbot provides general information only and is not a substitute for professional medical advice.`;
};
