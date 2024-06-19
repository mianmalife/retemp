import { classed } from "@tw-classed/react"

const Button = classed.button("rounded-xl border border-transparent font-medium cursor-pointer transition", {
  variants: {
    type: {
      normal: "bg-gray-100 hover:bg-gray-200",
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      danger: "bg-red-500 text-white hover:bg-red-600",
      success: "bg-green-500 text-white hover:bg-green-600"
    },
    size: {
      normal: "text-sm py-2 px-4",
      sm: "text-xs py-1.5 px-3",
      lg: 'text-lg py-2 px-6'
    }
  },
  defaultVariants: {
    type: 'normal',
    size: 'normal'
  }
})

export default Button