import React from 'react'
import './styles.css'

function ItemList({title, description, url}) {
  return (
    <div className="ItemList">
        <strong>{title}</strong>
        <p>{description}</p>
        <a href={url} target='blank_'>{url}</a>
        <hr />
    </div>
  )
}

export default ItemList;
