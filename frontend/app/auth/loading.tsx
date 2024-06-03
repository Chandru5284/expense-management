"use client";

// import components
import OverlayLoader from "@/components/overlay-loader/OverlayLoader";

const Loading = () => {
	return (
		<div className="relative">
			<OverlayLoader />
		</div>
	);
}

export default Loading;