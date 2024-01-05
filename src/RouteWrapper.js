// RouteWrapper.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const RouteWrapper = ({ routes }) => (
  <Routes>
    {routes.map((route, index) => (
      <Route key={index} {...route} />
    ))}
  </Routes>
);

export default RouteWrapper;
