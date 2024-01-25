import React from "react"
import { Button, Input, Slider, Textarea } from "@nextui-org/react"
import { useAuth } from "../context/useAuth"
import { useState } from "react"
import { useCreateGoal } from "../hooks/useCreateGoal"

console.log(React)
function AddGoal() {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [saved, setSaved] = useState('')
    const [remaining, setRemaining] = useState('')
    const [range, setRange] = useState(0)
    const { saveGoal, isGoalSaving } = useCreateGoal()

    const { user } = useAuth()

    function handleFilterBySalary(value) {
        setRange(Number(value));
    }

    function handleSubmit(e) {
        e.preventDefault()
        const goalData = {
            user: user.id,
            name,
            amount: Number(amount),
            description,
            deadline,
            saved: range,
            remaining: Number(amount) - Number(range),
        }
        console.log(goalData)
        saveGoal(goalData)
        setName('')
        setRemaining('')
        setAmount('')
        setDeadline('')
        setRange(0)
        setDescription('')
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex justify-center items-center border-spacing-1 py-8">
                <div className='max-w-2xl w-full border-1 border-green-500 rounded-tl-xl rounded-bl-xl py-10 px-10 h-64 '>
                    <Textarea
                        variant='bordered'
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                        value={description}
                        onChange={(e) => (setDescription(e.target.value))}
                    />
                </div>
                <div className="max-w-6xl w-full border-1 border-green-500 rounded-tr-xl rounded-br-xl py-10 px-10 h-64">
                    <div className="flex items-center justify-between gap-4">
                        <Input value={name}
                            onChange={(e) => (setName(e.target.value))} label='Write the name of goal' variant='bordered' size='sm' />
                        <Input value={amount}
                            onChange={(e) => (setAmount(e.target.value))} label='Total Amount' variant='bordered' size='sm' />
                        <Input value={deadline}
                            onChange={(e) => (setDeadline(e.target.value))} type='date' variant='bordered' size='sm' />
                    </div>
                    <div className="m-auto py-4">
                        <Slider
                            id="salarySlider"
                            step={50}
                            minValue={0}
                            size="lg"
                            maxValue={amount}
                            color="primary"
                            showTooltip={true}
                            value={range}
                            formatOptions={{ style: "currency", currency: "GEL" }}
                            tooltipValueFormatOptions={{ style: 'currency', currency: 'GEL' }}
                            className={`max-w-6xl w-full`}
                            onChange={(range) => handleFilterBySalary(range)}
                        />
                    </div>

                    <div className="w-full flex justify-between items-center pb-4 text-sm xl:text-lg">
                        <div className="flex items-center gap-2">
                            <Input value={saved}
                                onChange={(e) => (setSaved(e.target.value))} disabled={true} placeholder='Indicate amount saved' label={saved} variant='underlined' size='sm' className="text-green-500 font-semibold" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Input value={remaining}
                                onChange={(e) => (setRemaining(e.target.value))} disabled={true} placeholder='Indicate remaining amount' label={remaining} variant='underlined' size='md' className="text-green-500 font-semibold" />                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end items-center">
                <Button disabled={isGoalSaving} type='submit' color='primary' variant='ghost' >
                    Add Goal
                </Button>
            </div>
        </form>
    )
}

export default AddGoal
