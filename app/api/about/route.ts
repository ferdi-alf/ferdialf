import { About } from "@/types/about";
import { ApiResponse } from "@/types/api";
import { NextResponse } from "next/server";

const aboutData: About = {
  name: "Muhammad Ferdi Alfian",
  description:
    "I study at SMKN 4 and support the school as a volunteering developer, helping their digital workflow grow in a steady and reliable way. I focus my main energy on freelance work, where I handle client needs, deliver functional solutions, and build my professional experience through real projects. I aim for clear communication, consistent results, and a disciplined approach that prepares me for long term growth in fullstack development.",
  contact: {
    email: "ferdialf.dev@gmail.com",
    phone: "0881080288925",
    location: "Palembang, South Sumatra, Indonesia",
  },
  connect: {
    social: [
      {
        name: "GitHub",
        link: "https://github.com/ferdi-alf",
        logo: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                <g fill="none">
                    <rect width="256" height="256" fill="#f4f2ed" rx="60"></rect>
                    <path fill="#161614" d="M128.001 30C72.779 30 28 74.77 28 130.001c0 44.183 28.653 81.667 68.387 94.89c4.997.926 6.832-2.169 6.832-4.81c0-2.385-.093-10.262-.136-18.618c-27.82 6.049-33.69-11.799-33.69-11.799c-4.55-11.559-11.104-14.632-11.104-14.632c-9.073-6.207.684-6.079.684-6.079c10.042.705 15.33 10.305 15.33 10.305c8.919 15.288 23.394 10.868 29.1 8.313c.898-6.464 3.489-10.875 6.349-13.372c-22.211-2.529-45.56-11.104-45.56-49.421c0-10.918 3.906-19.839 10.303-26.842c-1.039-2.519-4.462-12.69.968-26.464c0 0 8.398-2.687 27.508 10.25c7.977-2.215 16.531-3.326 25.03-3.364c8.498.038 17.06 1.149 25.051 3.365c19.087-12.939 27.473-10.25 27.473-10.25c5.443 13.773 2.019 23.945.98 26.463c6.412 7.003 10.292 15.924 10.292 26.842c0 38.409-23.394 46.866-45.662 49.341c3.587 3.104 6.783 9.189 6.783 18.519c0 13.38-.116 24.149-.116 27.443c0 2.661 1.8 5.779 6.869 4.797C199.383 211.64 228 174.169 228 130.001C228 74.771 183.227 30 128.001 30M65.454 172.453c-.22.497-1.002.646-1.714.305c-.726-.326-1.133-1.004-.898-1.502c.215-.512.999-.654 1.722-.311c.727.326 1.141 1.01.89 1.508m4.919 4.389c-.477.443-1.41.237-2.042-.462c-.654-.697-.777-1.629-.293-2.078c.491-.442 1.396-.235 2.051.462c.654.706.782 1.631.284 2.078m3.374 5.616c-.613.426-1.615.027-2.234-.863c-.613-.889-.613-1.955.013-2.383c.621-.427 1.608-.043 2.236.84c.611.904.611 1.971-.015 2.406m5.707 6.504c-.548.604-1.715.442-2.57-.383c-.874-.806-1.118-1.95-.568-2.555c.555-.606 1.729-.435 2.59.383c.868.804 1.133 1.957.548 2.555m7.376 2.195c-.242.784-1.366 1.14-2.499.807c-1.13-.343-1.871-1.26-1.642-2.052c.235-.788 1.364-1.159 2.505-.803c1.13.341 1.871 1.252 1.636 2.048m8.394.932c.028.824-.932 1.508-2.121 1.523c-1.196.027-2.163-.641-2.176-1.452c0-.833.939-1.51 2.134-1.53c1.19-.023 2.163.639 2.163 1.459m8.246-.316c.143.804-.683 1.631-1.864 1.851c-1.161.212-2.236-.285-2.383-1.083c-.144-.825.697-1.651 1.856-1.865c1.183-.205 2.241.279 2.391 1.097"></path>
                </g>
             </svg>`,
      },
      {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/muhammad-ferdi-alfian-979273396?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        logo: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                <g fill="none">
                    <rect width="256" height="256" fill="#0a66c2" rx="60"></rect>
                    <path fill="#fbfbfb" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"></path>
                </g>
            </svg>`,
      },
      {
        name: "Instagram",
        link: "https://instagram.com/eternalferr_?igsh=MXNmcXI1cGE2dWJkYw==",
        logo: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" strokeWidth="0.5" stroke="#fff"></path></svg>`,
      },
    ],
    freelancePlarforms: [
      {
        name: "Fiverr",
        link: "https://www.fiverr.com/s/NN5ed38",
        logo: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#1dbf73" d="M15.352 3c0-.471 0-.707-.147-.854C15.06 2 14.823 2 14.352 2h-2.735C8.896 2 6.522 4.51 6.681 8.5H5c-.471 0-.707 0-.854.146C4 8.793 4 9.03 4 9.5V11c0 .471 0 .707.146.854C4.293 12 4.53 12 5 12h2v9c0 .471 0 .707.146.854C7.293 22 7.53 22 8 22h2c.471 0 .707 0 .854-.146C11 21.707 11 21.47 11 21v-9h4.53v9c0 .471 0 .707.147.854c.146.146.382.146.854.146H19c.471 0 .707 0 .854-.146C20 21.707 20 21.47 20 21V10.5c0-.943 0-1.414-.293-1.707S18.943 8.5 18 8.5h-7V7.23c0-.73.5-1.73 1.797-1.73h1.555c.471 0 .707 0 .853-.146c.147-.147.147-.383.147-.854z"></path>
            </svg>`,
      },
      {
        name: "Upwork",
        link: "https://www.upwork.com/freelancers/~010945969eb89d66ab?mp_source=share",
        logo: `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512">
                    <path fill="#0e1724" d="M56 32h336c30.9 0 56 25.1 56 56v336c0 30.9-25.1 56-56 56H56c-30.9 0-56-25.1-56-56V88c0-30.9 25.1-56 56-56m214.9 242.2c6.6-52.9 25.9-69.5 51.4-69.5c25.3 0 44.9 20.2 44.9 49.7s-19.7 49.7-44.9 49.7c-27.9 0-46.3-21.5-51.4-29.9m-26.7-41.8c-8.2-15.5-14.3-36.3-19.2-55.6h-62.9v78.1c0 28.4-12.9 49.4-38.2 49.4S84.1 283.4 84.1 255l.3-78.1H48.2V255c0 22.8 7.4 43.5 20.9 58.2c13.9 15.2 32.8 23.2 54.8 23.2c43.7 0 74.2-33.5 74.2-81.5v-52.5c4.6 17.3 15.4 50.5 36.2 79.7L215 392.6h36.8l12.8-78.4c4.2 3.5 8.7 6.6 13.4 9.4c12.3 7.8 26.4 12.2 40.9 12.6h3.4c45.1 0 80.9-34.9 80.9-81.9s-35.9-82.2-80.9-82.2c-45.4 0-70.9 29.7-78.1 60.1z"></path>
                </svg>
                `,
      },
      {
        name: "Freelancer",
        link: "https://www.freelancer.com/u/Ferdialfian80?frm=Ferdialfian80&sb=t",
        logo: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#0079c9" d="m14.096 3.076l1.634 2.292L24 3.076M5.503 20.924l4.474-4.374l-2.692-2.89m6.133-10.584L11.027 5.23l4.022.15M4.124 3.077l.857 1.76l4.734.294m-3.058 7.072l3.497-6.522L0 5.13m7.064 7.485l3.303 3.548l3.643-3.57l1.13-6.652l-4.439-.228Z"></path>
        </svg>`,
      },
    ],
  },
};

export async function GET() {
  try {
    const response: ApiResponse<About> = {
      success: true,
      data: aboutData,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: `Error fetching about data: ${error}`,
      },
      { status: 500 }
    );
  }
}
