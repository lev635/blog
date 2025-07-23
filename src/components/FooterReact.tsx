import github from "../assets/github-mark.svg"
import vercel from "../assets/vercel-icon-svgrepo-com.svg"

export default function Footer() {

  return (
    <footer>
      <a href="https://github.com/lev635/blog" target="_blank" aria-label="GitHub">
        <img src={github} alt="GitHub" width="32" height="32" />
      </a>
      <a href="https://vercel.com/" target="_blank" aria-label="Vercel">
        <img src={vercel} alt="Vercel" width="32" height="32" />
      </a>
    </footer>
  )

//     <style>
//   footer {
//     border - top: 2px solid #333333;
//     margin - top: 1rem;
//     padding: 1rem;
//     display: flex;
//     gap: 0.5rem;
//   }
//   footer img {
//     opacity: 0.8;
//   }
//   footer img:hover {
//     opacity: 1;
//   }
// </style >
}