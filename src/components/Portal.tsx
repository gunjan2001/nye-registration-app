import ReactDOM from "react-dom";

const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const domNode = typeof window !== "undefined" ? document.getElementById("portal") : null;

	if (domNode) {
		return ReactDOM.createPortal(children, domNode);
	}

	return null;
};

export { Portal };