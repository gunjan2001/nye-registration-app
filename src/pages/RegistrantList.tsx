import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { deleteRegistrant } from "../store/registrantSlice";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RegistrantList: React.FC = () => {
  const registrants =
    useSelector((state: RootState) => state?.registration?.list) ?? [];
  const dispatch = useDispatch<AppDispatch>();
  const [selectItem, setSelectItem] = useState("");

  const handleDelete = () => {
    dispatch(deleteRegistrant(selectItem));
    setSelectItem("");
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto mt-10 px-4">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-800">
        All Registrants ({registrants.length})
      </h2>

      {registrants?.length ? (
        <div className="mt-6">
          <div
            className="
          grid 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-8 
          place-items-center
        "
          >
            {registrants.map((item, idx) => (
              <div
                key={`${item?.id}_${idx}`}
                className="
              relative
              bg-white/80 backdrop-blur-lg border border-gray-200
              rounded-2xl shadow-lg p-6 w-full max-w-sm
              transition transform hover:scale-[1.03]
              hover:shadow-2xl
            "
              >
                {/* Delete Button */}
                <button
                  onClick={() => setSelectItem(item.id)}
                  className="
                absolute top-3 right-3 
                w-8 h-8 flex items-center justify-center
                bg-red-500 hover:bg-red-600
                text-white text-sm rounded-full shadow-md
                transition
              "
                >
                  ✕
                </button>

                {/* Profile + Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "/placeholder.png"}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.firstName} {item.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{item.email}</p>
                    <p className="text-sm text-gray-600">📱 {item.phone}</p>
                  </div>
                </div>

                {/* Extra Info */}
                <div className="mt-4 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Attending:</span>{" "}
                    {item.attending}
                  </p>
                  <p>
                    <span className="font-medium">Adults:</span> {item.adults}
                  </p>
                  <p>
                    <span className="font-medium">Kids:</span> {item.kids}
                  </p>
                </div>

                <p className="mt-3 text-sm italic text-gray-600">
                  {item.message || "No message"}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State Centered */
        <div className="flex justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
          relative
          bg-white/10 backdrop-blur-xl 
          p-10 rounded-3xl shadow-xl 
          max-w-md w-full text-center
          border border-white/20
        "
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="
            w-24 h-24 mx-auto mb-6
            bg-white/20 rounded-full 
            flex items-center justify-center
            shadow-lg backdrop-blur-md
          "
            >
              <span className="text-5xl">📝</span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Registrations Found
            </h2>

            {/* Subtext */}
            <p className="text-gray-700 text-base mb-6 leading-relaxed">
              Be the first to join the New Year’s Eve Celebration!
            </p>

            {/* CTA */}
            <Link
              to="/register"
              className="
            inline-block px-6 py-3 
            rounded-xl shadow-md
            bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600
            text-white font-semibold text-sm
            hover:opacity-90 hover:shadow-lg
            transition-all duration-300
          "
            >
              Register
            </Link>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="animate-pulse absolute top-6 left-10 w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="animate-ping absolute bottom-10 right-6 w-3 h-3 bg-fuchsia-400/60 rounded-full"></div>
              <div className="animate-bounce absolute top-1/2 left-1/4 w-2 h-2 bg-indigo-300/50 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Modal */}
      {!!selectItem && (
        <Modal isOpen={!!selectItem}>
          <h2 className="text-lg font-bold text-gray-800">
            Delete Registrant?
          </h2>
          <p className="text-gray-600 mt-2 mb-6">
            Are you sure you want to delete this registration?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setSelectItem("")}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RegistrantList;
