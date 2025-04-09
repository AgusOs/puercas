import { useEffect, useState } from "react";
import {
  getAllSpots,
  createSpot,
  deleteSpot,
  toggleCompleted,
  updateRating,
  updateDescription,
} from "../api/spotsApi";

export default function SpotList() {
  const [spots, setSpots] = useState([]);
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    loadSpots();
  }, []);

  const loadSpots = async () => {
    const data = await getAllSpots();
    setSpots(data);
  };

  const handleAdd = async () => {
    if (!newDescription.trim()) return;
    await createSpot( newDescription );
    setNewDescription("");
    await loadSpots();
  };

  const handleToggle = async (id) => {
    await toggleCompleted(id);
    await loadSpots();
  };

  const handleRate = async (id, rating) => {
    await updateRating(id, rating);
    await loadSpots();
  };

  const handleDelete = async (id) => {
    await deleteSpot(id);
    await loadSpots();
  };

  const handleEdit = async (id) => {
    const newDesc = prompt("Nueva descripción:");
    if (newDesc) {
      await updateDescription(id, newDesc);
      await loadSpots();
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center mb-4">Lista de Spots</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 px-2 py-1 border rounded"
          placeholder="Nuevo spot"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={handleAdd}
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2">
        {spots.map((spot) => (
          <li
            key={spot.id}
            className={`p-3 rounded shadow flex flex-col gap-2 bg-white ${
              spot.isCompleted ? "opacity-50" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{spot.description}</span>
              <button
                className="text-sm text-blue-600 underline"
                onClick={() => handleEdit(spot.id)}
              >
                Editar
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer ${
                      spot.rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleRate(spot.id, star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  className={`text-sm px-2 py-1 rounded ${
                    spot.isCompleted
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleToggle(spot.id)}
                >
                  {spot.isCompleted ? "Hecho" : "Marcar"}
                </button>
                <button
                  className="bg-red-200 text-red-800 text-sm px-2 py-1 rounded"
                  onClick={() => handleDelete(spot.id)}
                >
                  Borrar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
