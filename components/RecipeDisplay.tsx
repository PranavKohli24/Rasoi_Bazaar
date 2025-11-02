import React, { useState } from 'react';
import { Recipe, Tip } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
  onFinishCooking: () => void;
}

const SectionTitle: React.FC<{ title: string; icon: JSX.Element; }> = ({ title, icon }) => (
    <div className="flex items-center mb-6 border-b-2 border-orange-800/50 pb-3">
      <span className="text-orange-400 mr-4">{icon}</span>
      <h2 className="text-3xl font-bold font-serif text-orange-100">{title}</h2>
    </div>
);

const TipCallout: React.FC<{ tip: Tip }> = ({ tip }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="mt-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-sm text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded"
          aria-expanded={isOpen}
          aria-controls={`tip-${tip.title.replace(/\s+/g, '-')}`}
        >
          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm-1.414 8.486a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
          {isOpen ? 'Hide Tip' : tip.title}
        </button>
        {isOpen && (
          <div
            id={`tip-${tip.title.replace(/\s+/g, '-')}`}
            className="mt-2 ml-4 p-3 bg-orange-900/40 border-l-4 border-orange-500 text-orange-200 rounded-r-md text-sm animate-fade-in-up"
            style={{animationDuration: '0.3s'}}
          >
            <p>{tip.content}</p>
          </div>
        )}
      </div>
    );
};


const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onFinishCooking }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(recipe.ingredients.length).fill(false)
  );
  const [isCooking, setIsCooking] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleIngredientToggle = (index: number) => {
    const newCheckedState = [...checkedIngredients];
    newCheckedState[index] = !newCheckedState[index];
    setCheckedIngredients(newCheckedState);
  };

  const handleStartCooking = () => {
    setIsCooking(true);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < recipe.method.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-12">
        {/* Mobile dish header */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="font-serif text-4xl font-black text-white mb-2">{recipe.dishName}</h1>
            {/* <p className="text-lg text-orange-200/90 italic">“{recipe.description}”</p> */}
          </div>

        
        {/* --- Left Sticky Column --- */}
        <aside className="lg:col-span-2 lg:sticky lg:top-12 lg:self-start">
            <div className="bg-stone-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-stone-700">
                <SectionTitle title="Ingredients" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z" clipRule="evenodd" /></svg>} />
                <ul className="space-y-4">
                    {recipe.ingredients.map((ing, index) => (
                    <li key={index}>
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={checkedIngredients[index]}
                                onChange={() => handleIngredientToggle(index)}
                                className="h-6 w-6 mr-4 bg-stone-700 border-stone-500 rounded text-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-800 focus:ring-orange-500 transition-colors duration-200"
                            />
                            <span className={`flex-1 text-stone-300 group-hover:text-white transition-colors duration-200 ${checkedIngredients[index] ? 'line-through text-stone-500' : ''}`}>
                                <span className="font-semibold text-white">{ing.amount}</span> {ing.commonName} ({ing.englishName})
                            </span>
                        </label>
                    </li>
                    ))}
                </ul>
            </div>
        </aside>

        {/* --- Right Content Column --- */}
        <main className="lg:col-span-3">
            <div className="bg-stone-800/50 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-stone-700 p-6 sm:p-8 md:p-12">
                {/* --- Header --- */}
                <div className="mb-12">
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-white mb-4">{recipe.dishName}</h1>
                    <p className="text-xl text-orange-200/90 italic max-w-3xl">“{recipe.description}”</p>
                    <div className="mt-6 inline-flex items-center justify-center bg-orange-900/40 text-orange-200 px-4 py-2 rounded-full border border-orange-700/60">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">{recipe.prepTime}</span>
                    </div>
                </div>

                {/* --- Equipment --- */}
                <div className="mb-12">
                    <SectionTitle title="Equipment" 
                     />
                    <ul className="space-y-3 text-stone-300">
                        {recipe.equipment.map((tool, index) => (
                        <li key={index} className="pl-1 text-lg">
                            <span className="text-orange-500 font-bold mr-2">&#8227;</span> {tool.item}
                            {tool.isSpecialized && (
                            <div className="mt-2 ml-4 p-3 bg-orange-900/40 border-l-4 border-orange-500 text-orange-200 rounded-r-md text-sm">
                                <span className="font-bold">Heads up!</span>
                                {tool.alternative && <p className="mt-1">
                                <span className="font-semibold">Alternative:</span> {tool.alternative}
                                </p>}
                            </div>
                            )}
                        </li>
                        ))}
                    </ul>
                </div>
      
                {/* --- Method --- */}
                <div className="mb-12">
  <SectionTitle
    title="Method"
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
    }
  />

  {!isCooking ? (
    <div className="text-center py-8">
      <button
        onClick={handleStartCooking}
        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-200"
      >
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
          Start Cooking
        </div>
      </button>
    </div>
  ) : (
    <div className="mt-6">
      {/* Step Display */}
      <div
        key={currentStepIndex}
        className="bg-stone-800 p-6 sm:p-8 rounded-lg border border-stone-700 transition-all duration-300"
      >
        <p className="text-sm font-semibold text-orange-400 mb-2">
          STEP {currentStepIndex + 1} OF {recipe.method.length}
        </p>
        <p className="text-stone-100 text-lg md:text-xl leading-relaxed">
          {recipe.method[currentStepIndex].instruction}
        </p>
        {recipe.method[currentStepIndex].tip && <TipCallout tip={recipe.method[currentStepIndex].tip!} />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0}
          className="bg-stone-700 hover:bg-stone-600 disabled:bg-stone-900 disabled:text-stone-500 text-stone-100 font-medium py-2 px-5 rounded-lg transition-colors duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </button>

        {currentStepIndex < recipe.method.length - 1 ? (
          <button
            onClick={handleNextStep}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-5 rounded-lg transition-colors duration-200 flex items-center"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={onFinishCooking}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            I’m Done Cooking
          </button>
        )}
      </div>
    </div>
  )}
</div>


                {/* --- Notes --- */}
                {recipe.notes && recipe.notes.length > 0 && (
                    <div className="mb-12">
                        <SectionTitle title="Notes & Tips" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>} />
                        <ul className="list-disc list-inside space-y-3 text-stone-300 prose prose-lg max-w-none">
                        {recipe.notes.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                        </ul>
                    </div>
                )}
            </div>
        </main>
      </div>
    </div>
  );
};

export default RecipeDisplay;
