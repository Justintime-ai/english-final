
import React from 'react';
import { CardData, AppConfig, AnimationType } from '../types';
import { Settings, Plus, Trash2, ChevronUp, ChevronDown, Layers, Image as ImageIcon, Palette } from 'lucide-react';

interface EditorPanelProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  cards: CardData[];
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ config, setConfig, cards, setCards }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const addCard = () => {
    const newCard: CardData = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      title: 'New Content Layer',
      content: 'Edit this content in the editor panel.',
      animationType: 'center',
      bgColor: '#ffffff',
      opacity: 0.5,
      textColor: 'black',
    };
    setCards([...cards, newCard]);
  };

  const updateCard = (id: string, updates: Partial<CardData>) => {
    setCards(cards.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const removeCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'w-96' : 'w-14 h-14'}`}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 transition-colors"
        >
          <Settings size={24} />
        </button>
      ) : (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[80vh]">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
            <h3 className="font-bold flex items-center gap-2 text-gray-800">
              <Layers size={18} /> Design Editor
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto space-y-6">
            {/* Global Settings */}
            <section className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider flex items-center gap-2">
                <Palette size={14} /> Background Settings
              </h4>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setConfig({ ...config, backgroundType: 'color' })}
                    className={`flex-1 py-2 rounded-lg text-sm border transition-all ${config.backgroundType === 'color' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200'}`}
                  >
                    Color
                  </button>
                  <button 
                    onClick={() => setConfig({ ...config, backgroundType: 'image' })}
                    className={`flex-1 py-2 rounded-lg text-sm border transition-all ${config.backgroundType === 'image' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200'}`}
                  >
                    Image
                  </button>
                </div>
                <input 
                  type="text" 
                  value={config.backgroundValue}
                  onChange={(e) => setConfig({ ...config, backgroundValue: e.target.value })}
                  placeholder={config.backgroundType === 'color' ? '#HEX Color' : 'Image URL'}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </section>

            {/* Cards List */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider flex items-center gap-2">
                  <Layers size={14} /> Layers ({cards.length})
                </h4>
                <button 
                  onClick={addCard}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {cards.map((card, idx) => (
                  <div key={card.id} className="p-4 border rounded-xl space-y-3 bg-gray-50/50">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-400">LAYER #{idx + 1}</span>
                      <button onClick={() => removeCard(card.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <select 
                        value={card.type}
                        onChange={(e) => updateCard(card.id, { type: e.target.value as any })}
                        className="text-xs p-2 border rounded bg-white"
                      >
                        <option value="text">Text Card</option>
                        <option value="image">Image Card</option>
                      </select>
                      <select 
                        value={card.animationType}
                        onChange={(e) => updateCard(card.id, { animationType: e.target.value as AnimationType })}
                        className="text-xs p-2 border rounded bg-white"
                      >
                        <option value="left">Float Left</option>
                        <option value="right">Float Right</option>
                        <option value="center">Center Scale</option>
                      </select>
                    </div>

                    <input 
                      type="text" 
                      value={card.title}
                      onChange={(e) => updateCard(card.id, { title: e.target.value })}
                      placeholder="Title"
                      className="w-full text-sm p-2 border rounded"
                    />

                    {card.type === 'image' && (
                      <input 
                        type="text" 
                        value={card.imageUrl}
                        onChange={(e) => updateCard(card.id, { imageUrl: e.target.value })}
                        placeholder="Image URL"
                        className="w-full text-sm p-2 border rounded"
                      />
                    )}

                    <textarea 
                      value={card.content}
                      onChange={(e) => updateCard(card.id, { content: e.target.value })}
                      placeholder="Content"
                      rows={2}
                      className="w-full text-sm p-2 border rounded"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold uppercase">Color</label>
                        <input 
                          type="color" 
                          value={card.bgColor}
                          onChange={(e) => updateCard(card.id, { bgColor: e.target.value })}
                          className="w-full h-8 p-1 border rounded cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold uppercase">Opacity: {Math.round(card.opacity * 100)}%</label>
                        <input 
                          type="range" 
                          min="0" max="1" step="0.05"
                          value={card.opacity}
                          onChange={(e) => updateCard(card.id, { opacity: parseFloat(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase">Text Color:</label>
                      <button 
                        onClick={() => updateCard(card.id, { textColor: 'black' })}
                        className={`w-6 h-6 rounded-full border ${card.textColor === 'black' ? 'ring-2 ring-blue-500' : ''} bg-black`}
                      />
                      <button 
                        onClick={() => updateCard(card.id, { textColor: 'white' })}
                        className={`w-6 h-6 rounded-full border ${card.textColor === 'white' ? 'ring-2 ring-blue-500' : ''} bg-white`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="p-4 bg-gray-50 border-t rounded-b-2xl">
             <button 
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ config, cards }, null, 2));
                const downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href", dataStr);
                downloadAnchorNode.setAttribute("download", "site_config.json");
                document.body.appendChild(downloadAnchorNode);
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
              }}
              className="w-full py-2 bg-gray-800 text-white rounded-lg text-sm font-bold hover:bg-gray-900"
            >
              Export Config
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorPanel;
