import { useRef, useState } from 'react'
import { BsCamera } from 'react-icons/bs'

const Form = () => {
    const coverRef = useRef();
    const profileRef = useRef();
    const [profile, setProfile] = useState();
    const [cover, setCover] = useState();

    return (
        <div className="container p-5">
            <h2 className='font-medium mb-3' style={{fontSize: '2rem'}}>Formulaire</h2>
            <form>
                <div className="relative">
                    <img src={cover?URL.createObjectURL(cover):'/banner.jpg'} style={{objectFit: 'cover', width: '100%', height: '100px'}} alt="" />
                    <div className="flex justify-center items-center p-1 border rounded-full bg-white absolute right-5 top-3 cursor-pointer" onClick={() => {coverRef.current.click()}}>
                        <BsCamera />
                    </div>
                    <div className='hidden'>
                        <input type="file" name="cover" id='cover' ref={coverRef} accept="image/*" onChange={(e)=>setCover(e.target.files[0])} />
                    </div>
                </div>
                <div className="relative"  style={{ width: '120px', height: '120px', margin: '-40px 10px 0px'}}>
                    <img src={profile?URL.createObjectURL(profile):'/persons.png'} style={{ width: '120px', height: '120px', objectFit: 'cover', border: '2px solid #fff', borderRadius: '50%', margin: '-40px 10px 0px'}} alt="" />
                    <div className="flex justify-center items-center p-1 border rounded-full bg-white absolute right-0 bottom-0 cursor-pointer" onClick={() => {profileRef.current.click()}}>
                        <BsCamera />
                    </div>
                    <div className='hidden'>
                        <input type="file" name="profile" id='profile' ref={profileRef} accept="image/*" onChange={(e)=>setProfile(e.target.files[0])} />
                    </div>
                </div>

                <p className='text-lg mt-5 p-2'><b>Identité</b></p>
                <input type="text" name="name" id="name"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='Nom' 
                />
                <input type="text" name="profession" id="profession"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='Profession' 
                />
                <input type="text" name="company" id="company"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='company' 
                />
                <textarea name="bio" id="bio" rows={5}
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-xl w-72'
                    placeholder='Biographie' 
                >
                </textarea>

                <p className='text-lg mt-5 p-2'><b>Contacts</b></p>
                <input type="text" name="phoneNumber" id="phoneNumber"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='Numéro de téléphone' 
                />
                <input type="email" name="email" id="email"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='Adresse email' 
                />
                <input type="text" name="address" id="address"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='Adresse physique' 
                />

                <p className='text-lg mt-5 p-2'><b>Liens</b></p>
                <input type="text" name="website" id="website"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='Site web' 
                />
                <input type="text" name="facebook" id="facebook"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='Facebook' 
                />
                <input type="text" name="whatsapp" id="whatsapp"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='Whatsapp' 
                />
                <input type="text" name="instagram" id="instagram"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='Instagram' 
                />
                <input type="text" name="linkedin" id="linkedin"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='LinkedIn' 
                />
                <input type="text" name="x" id="x"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='X' 
                />
                <input type="text" name="tiktok" id="tiktok"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='Tiktok' 
                />
                <input type="text" name="youtube" id="youtube"
                    className='block mb-5 bg-gray-300 py-2 px-4 rounded-full w-72'
                    placeholder='Youtube' 
                />
                <button 
                    type='button'
                    className='block mb-5 bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded-full w-72 cursor-pointer'
                    onClick={()=>console.log('Envoyé!')}
                >
                    Enregistrer
                </button>
            </form>
        </div>
    )
}

export default Form
