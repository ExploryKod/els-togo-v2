
import * as React from "react"
import { SVGProps } from "react"
const LinkedinIcon: React.FC  = (props: SVGProps<SVGSVGElement>) => (
    <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ? props.width : 24}
    height={props.height ? props.height : 24}
    fill="var(--background)"
    >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx={4} cy={4} r={2} />
    </svg>
)
export default LinkedinIcon






