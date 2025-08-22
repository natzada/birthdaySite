import { useNavigate } from "react-router-dom";

   const Home: React.FC = () => {
     const navigate = useNavigate();

     const handleClick = () => {
       navigate("/content");
     };

     return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-black-red">
         <button
           className="px-6 py-3 text-lg font-bold text-white bg-gray-900 bg-opacity-60 rounded-lg hover:bg-black transition-colors sm:w-auto sm:px-6 sm:py-3"
           onClick={handleClick}
         >
           Clique aqui ❤
         </button>
       </div>
     );
   };

   export default Home;