import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default class ComponentDocs extends React.Component {
  render() {
    const {name, propDocs, children} = this.props;

    return <div className="container-fluid component-docs">
      <div className="row">
        <h2>{name}</h2>
      </div>

      {propDocs.description ?
        <div className="row">
          <p className="component-description">{propDocs.description}</p>
        </div>
        : null
      }

      <div className="row prop-docs">
        <h4>{name} props:</h4>
        {_.map(_.get(propDocs, 'props'), (propInfo, propKey) => {
          return <div key={propKey} className="prop-doc">
            <strong>{propKey}</strong>: {_.get(propInfo, 'type.name', 'unknown')}
            {propInfo.description ? <br/> : null}
            {propInfo.description ?
              <span className="prop-description">{propInfo.description}</span>
              : null}

            {propInfo.defaultValue ?
              <div className="prop-default">default value: <code>{propInfo.defaultValue.value}</code></div>
              : null}
          </div>
        })}

      </div>

      {children}
    </div>
  }
}