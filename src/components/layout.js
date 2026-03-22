import Navbar from '../components/navbar'
import Footer from '../components/footer'

const Layout = ({ children }) => {
    return ( 
        <div className="min-h-screen bg-[#0f111a] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col relative">
            {/* Ambient Background Glows — clipped to viewport via overflow-hidden wrapper */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]"></div>
            </div>
            
            <Navbar/>
            <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12 z-10 relative">
              {children}
            </main>
            <Footer/>
        </div>
    );
}
 
export default Layout;