import React from "react"


import { useState } from 'react';
import { Button, Slider } from "@nextui-org/react";
import { formatDateString } from "../hooks/formatDate";
import { useGetGoals } from "../hooks/useGetGoals";
import { formatGeorgianLari } from "../utils/formatGeorgianLari";
import { useUpdateGoal } from "../hooks/useUpdateGoal";
import { useAuth } from '../context/useAuth';
import { useDeleteGoal } from '../hooks/useDeleteGoal';

console.log(React)
function GoalList() {
    const { user } = useAuth()
    const { goals, isGoalsPending } = useGetGoals(user.id);
    const { update, isUpdating } = useUpdateGoal();
    const { deleteGoal, isGoalDeleting } = useDeleteGoal()

    // State to track the slider value for each goal
    const [sliderValues, setSliderValues] = useState({});

    if (isGoalsPending) return <p>Loading ...</p>;

    console.log(goals)
    const maxGoals = goals.sort((a, b) => b.id - a.id).slice(0, 3);

    const handleSliderChange = (goalId, value) => {
        setSliderValues(prevValues => ({
            ...prevValues,
            [goalId]: value,
        }));
    };

    const handleUpdateButtonClick = (goalId) => {
        const newValue = sliderValues[goalId];
        console.log(goalId)
        const updateData = {
            id: goalId,
            saved: newValue
        }
        update(updateData);
    };

    const handleDeleteButtonClick = (id) => {
        console.log('Delete button clicked for goal ID:', id);

        deleteGoal(id);
    };

    console.log(maxGoals)
    return (
        <div className="w-full">
            {maxGoals.map(goal => (
                <div key={goal.id} className="flex justify-center items-center border-spacing-1 py-8">
                    <div className='max-w-2xl w-full border-1 border-stone-600 rounded-tl-xl rounded-bl-xl py-10 px-10 h-52 '>
                        <p className="text-stone-600 text-lg">{goal.description}</p>
                    </div>
                    <div className="max-w-6xl w-full border-1 border-stone-600 rounded-tr-xl rounded-br-xl py-10 px-10 h-52">
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-base text-slate-900 font-semibold">{goal.name}</p>
                            <div className="text-base text-slate-900 font-semibold flex items-center gap-2">
                                <p>Total Amount:</p>
                                <p className="text-green-500">GEL {formatGeorgianLari(goal.amount)}</p>
                            </div>
                            <p className="text-base text-slate-900 font-semibold">{formatDateString(goal.deadline)}</p>
                        </div>
                        <div className="m-auto py-4">
                            <Slider
                                id={`salarySlider-${goal.id}`}
                                step={50}
                                minValue={0}
                                size="lg"
                                maxValue={goal.amount}
                                color="primary"
                                showTooltip={true}
                                defaultValue={goal.saved}
                                formatOptions={{ style: "currency", currency: "GEL" }}
                                tooltipValueFormatOptions={{ style: 'currency', currency: 'GEL' }}
                                className={`max-w-6xl w-full`}
                                onChange={(value) => handleSliderChange(goal.id, value)}
                            />
                        </div>
                        <div className="w-full flex justify-between items-center pb-4 text-sm xl:text-lg">
                            <div className="flex items-center gap-1">
                                <p>Amount saved</p>
                                <p className="text-green-500 font-semibold">GEL {formatGeorgianLari(goal.saved)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p>Remaining amount </p>
                                <p className="text-stone-500 font-semibold">GEL {formatGeorgianLari(goal.remaining)}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    size='sm'
                                    disabled={isUpdating || isGoalDeleting}
                                    type='button'
                                    color='primary'
                                    variant='ghost'
                                    onClick={() => handleUpdateButtonClick(goal.id)}
                                >
                                    Update
                                </Button>
                                <Button onClick={() => handleDeleteButtonClick(goal.id)}
                                    size='sm' disabled={isGoalDeleting || isUpdating} type='button' color='danger' variant='ghost' >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GoalList;
