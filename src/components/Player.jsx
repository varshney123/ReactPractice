import { useState } from "react";

export default function Player({initialName, symbol, isActive}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [ isEditing, setIsEditing ] = useState(false);

    function showInput(){
        setIsEditing(editting => !editting);
    }

    function onNameChange(event){
        setPlayerName(event.target.value)
    }

    return (
        <li className={isActive ? 'active' : null}>
            <span className="player">
               {!isEditing && <span className="player-name">{playerName}</span>}
               { isEditing && <input type="text" required value={playerName} onChange={onNameChange}></input> }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={showInput}>{!isEditing ? 'Edit' : 'Save'}</button>
        </li>
    );
}