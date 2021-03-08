import {React,useState} from 'react';
import {useDropzone} from 'react-dropzone';

function DropFiles({product,setProduct}) {
    const [checked,setChecked] = useState(false)
    const {acceptedFiles,fileRejections, getRootProps, getInputProps} = useDropzone({maxFiles:3});
  
  const acceptedFileItems = acceptedFiles.map(file => (
     
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  
  const fileRejectionItems = fileRejections.map(({ file, errors  }) => { 
    return (
      <li key={file.path}>
           {file.path} - {file.size} bytes
           <ul>
             {errors.map(e => <li key={e.code}>{e.message}</li>)}
          </ul>
 
      </li>
    ) 
   });

  return (
    <section className="dropContainer">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} onClick={()=>setChecked(false)}/>
        <p>Arrastra las fotos del producto aquí, o haz click para seleccionar</p>
        <em>3 archivos como máximo</em>
      </div>
      <aside className='files'>
       {acceptedFileItems.length!==0&& <h4 style={{margin:'1px'}}>Archivos</h4>}
      
        <ul>{acceptedFileItems}</ul>
        {fileRejectionItems.length!==0&&<h4>Archivos rechazados</h4>}
        <ul>{fileRejectionItems}</ul>
      
        <button className='aceptarPics' onClick={()=> {
          setProduct({...product,arrayPic:acceptedFiles})
          setChecked(true)
        }}>Aceptar</button>
        {(checked&&acceptedFiles.length!==0) &&<p>Fotos cargadas</p>}
        {console.log(acceptedFiles)}
      </aside>
    </section>
  );
}




export default DropFiles

