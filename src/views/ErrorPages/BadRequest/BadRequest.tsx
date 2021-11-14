import { useLocation } from 'react-router-dom';

export default function BadRequest() {
  const { state } = useLocation();

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div className="card">
          <h1>400 - Bad request</h1>
          <p>Error message: {state}</p>
        </div>
      </div>
    </div>
  );
}