import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import axios from "axios"
import { BASE_API_URL } from "../utils/constante"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// Schéma de validation Zod
const loginSchema = z.object({
  phone: z.string()
    .min(1, "L'email ou le numéro de téléphone est requis"),
  password: z.string()
    .min(1, "Le mot de passe est requis"),
})

type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();  

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setMessage('')
    try {
      const response = await axios.post(BASE_API_URL+"/api/auth/login", {
        data: data.phone, 
        password: data.password
      })
      
      localStorage.setItem('user', response.data.profile)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('refreshToken', response.data.refreshToken)

      setLoading(false)
      setMessage('')
      navigate('/dashboard')
    } catch (err) {
      setLoading(false)
      setMessage('Echec de connexion')
    }   
  }

  return (
    <div className="w-screen px-3">
      <div className="border bg-white my-5 mx-auto sm:w-[25rem]">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="w-full sm:mx-auto sm:w-full sm:max-w-sm">
            <img src="/logo.png" width={100} alt="logo ghenny" className="mx-auto" />
            <h3 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Connectez-vous</h3>
          </div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              {message && <div className="flex w-full justify-center rounded-md">
                <small className='alert alert-danger p-2'>{message}</small>
              </div>}
              
              <div>
                <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                  Email ou numéro de téléphone
                </label>
                <div className="mt-2">
                  <input 
                    id="phone" 
                    type="text" 
                    {...register("phone")}
                    className="block border w-full rounded-md bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                    onChange={(e) => setValue("phone", e.target.value)}
                    autoFocus
                  />
                  {errors.phone && (
                    <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Mot de passe
                  </label>
                  <div className="text-sm">
                    {/* <Link to={"/auth/find_user"} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Oublié ?
                    </Link> */}
                  </div>
                </div>
                <div className="relative mt-2">
                  <input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    {...register("password")}
                    className="block border w-full rounded-md bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                    onChange={(e) => setValue("password", e.target.value)}
                  />
                  {showPassword
                    ? <FaRegEye onClick={()=>setShowPassword(!showPassword)} className="absolute bg-white top-3 right-2 cursor-pointer" />
                    : <FaRegEyeSlash onClick={()=>setShowPassword(!showPassword)} className="absolute bg-white top-3 right-2 cursor-pointer" />
                  }
                </div>
                {errors.password && (
                  <small className="text-red-500 text-xs mt-1">{errors.password.message}</small>
                )}
              </div>

              <div>
                {
                  loading
                  ? <button disabled className="button-disabled flex w-full justify-center p-1" style={{border: '1px solid #ddd'}}>
                      Chargement...
                    </button>
                  : <button type="submit" className="flex w-full justify-center text-gray-700 rounded-md bg-[#30D5C8] px-3 py-1.5 text-sm/6 font-semibold shadow-xs hover:bg-[#30D5C8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30D5C8]">
                      Se connecter
                    </button>
                }
              </div>
            </form>

            <p className="text-center text-sm/6 text-gray-500 mt-2">
              Pas de compte ?
              <Link to={"/auth/register"} className="font-semibold text-[#1aaa9e] hover:text-[#1aaa9e]"> S'inscrire</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login