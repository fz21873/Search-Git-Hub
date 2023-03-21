
type PropsInput = {
  onchange:  React.ChangeEventHandler<HTMLInputElement> | undefined;
  onclick: () => void;
  theme?: 'dark' | 'ligth'
}
const InputSearch = ({onchange,onclick, theme='ligth'}:PropsInput) =>{
  
  return(
    <div className="flex justify-center gap-2">
      <input 
       className="bg-transparent border-2 rounded-lg p-2"
      onChange={onchange} 
      placeholder="Pesquise por usuário"/>
      <button
      className="bg-slate-300 rounded-lg p-2" 

      onClick={onclick}
      >Buscar</button>
    </div>
  )
}
export default InputSearch;