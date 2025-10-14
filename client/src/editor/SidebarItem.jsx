import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './DragItemTypes'; 

const SidebarItem = ({ type, name }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CONTENT_BLOCK, 
        item: { type }, 
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div 
            ref={drag} 
            style={{ 
                opacity, 
                padding: '10px', 
                margin: '5px 0', 
                border: '1px solid #ccc', 
                cursor: 'grab',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '4px',
                textAlign: 'center'
            }}
        >
            {name}
        </div>
    );
};

export default SidebarItem;