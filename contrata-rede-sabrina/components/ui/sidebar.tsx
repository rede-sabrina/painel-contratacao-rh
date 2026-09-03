export default function Sidebar(){
    return(
     <aside className="w-58 bg-white text-black p-4">
        <h2>Rede Sabrina</h2>
        <nav>
            <ul>
                <h4>Principal</h4>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/vagas">Vagas</a></li>
                
                <h4>Candidatos</h4>
                <li><a href="/banco-candidatos">Banco de Candidatos</a></li>
                <li><a href="/banco-talentos">Banco de Talentos</a></li>
                
                <h4>Processo</h4>
            </ul>
        </nav>
     </aside>   
    )
}