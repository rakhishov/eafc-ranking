import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex flex-col login-form bg-white p-8 shadow-lg shadow-purple-600/50'>
      <div className='text-center mb-4'>Log In to account</div>
      <div className="form">
        <form>
          <div className="input-container">
            <label>Username </label>
            <input className='input-class' type="text" name="" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input className='input-class' type="password" name="u" required />
          </div>
          <div className="flex justify-center mt-4 cursor-pointer text-base border-1 border-solid border-green-300 bg-green-300 hover:bg-green-700">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
    
  )
}
