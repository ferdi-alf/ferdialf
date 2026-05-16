import Image from "next/image";

const Navbar = () => {
  return (
    <div
      className="fixed top-2 left-1/2 -translate-x-1/2 z-50 max-w-7xl w-[95%]"
      style={{
        filter:
          "drop-shadow(0 8px 32px rgba(0,0,0,0.55)) drop-shadow(0 2px 6px rgba(0,0,0,0.4))",
      }}
    >
      <div
        style={{
          borderRadius: 18,
          padding: "1px",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.6) 100%)",
        }}
      >
        <div
          className="text-white backdrop-blur-md"
          style={{
            borderRadius: 17,
            background:
              "linear-gradient(160deg, rgba(55,55,60,0.92) 0%, rgba(20,20,22,0.97) 60%, rgba(10,10,12,0.99) 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.14), inset 1px 0 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.5), inset -1px 0 0 rgba(0,0,0,0.35)",
          }}
        >
          <div className="p-3.5 flex items-center">
            <div
              style={{
                position: "relative",
                filter:
                  "drop-shadow(0 4px 12px rgba(0,0,0,0.7)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
              }}
            >
              <div
                style={{
                  padding: "1.5px",
                  borderRadius: 10,
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.35) 0%, rgba(180,180,180,0.1) 50%, rgba(0,0,0,0.5) 100%)",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    borderRadius: 8.5,
                    overflow: "hidden",
                    background: "#0a0a0a",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.8)",
                  }}
                >
                  <Image
                    width={200}
                    height={200}
                    loading="eager"
                    alt="Muhammad Ferdi Alfian - Logo"
                    src="/images/icon.PNG"
                    className="w-9 h-9 block"
                    style={{ display: "block" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
