import React from 'react';
import './List.scss';
import classNames from 'classnames';
import Badge from '../Badge';

export default function List(props) {
  const { items, deleteItems } = props;

  return (
    <ul className="list">
      {items.map((el, i) => {
        return (
          <li
            onClick={props.onClick}
            key={`${el}_${i}`}
            className={classNames(el.className, {
              active: el.active,
            })}>
            {el.icon ? el.icon : <Badge color={el.color.name} />}

            <span>{el.name}</span>

            {props.isRemovable && (
              <span
                onClick={() => {
                  deleteItems(el.id);
                }}
                className={'X'}>
                x
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
