
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { useState, useEffect } from 'react';

const LifestyleCalculator = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [nextButtonDisabledState, setnextButtonDisabledState] = useState<boolean>(true);
    const [expenses, setExpenses] = useState<Record<string, string>>({
        housing: '',
        transportation: '',
        food: '',
        personal: '',
        debtSavings: '',
        other: ''
    });

    const [totalMonthly, setTotalMonthly] = useState(0);
    const [totalAnnual, setTotalAnnual] = useState(0);
    const [requiredSalary, setRequiredSalary] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if(user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone3_4');
                if (response) {
                    setExpenses(response.responses.expenses as Record<string, string>);
                    setnextButtonDisabledState(false);
                }
            }
            getResponse();
        }
    }, [user])

    // Calculate totals whenever expenses change
    useEffect(() => {
        const allValues = Object.values(expenses);
        const hasEmptyFields = allValues.some(value => value === '' || value === null);

        if (!hasEmptyFields) {
            const numericValues = allValues.map(val => parseFloat(val) || 0);
            const monthlyTotal = numericValues.reduce((sum, val) => sum + val, 0);
            const annualTotal = monthlyTotal * 12;
            const grossSalary = annualTotal / 0.75;

            setTotalMonthly(monthlyTotal);
            setTotalAnnual(annualTotal);
            setRequiredSalary(grossSalary);
            setIsComplete(true);
        } else {
            setIsComplete(false);
            setTotalMonthly(0);
            setTotalAnnual(0);
            setRequiredSalary(0);
        }
    }, [expenses]);

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone3/5", prevMilestoneId: "milestone3/4" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone3/5');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone3/3');
    };

    const handleInputChange = (field: any, value: string) => {
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setExpenses(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSubmitSalary = async () => {
        if (user) {
            try {
                const result = await submitMilestone('milestone3_4', { userId: user?.uid, responses: { expenses, totalMonthly, totalAnnual, requiredSalary, tax: "25%" } });
                setnextButtonDisabledState(false);
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const formatCurrency = (amount: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleSubmit = () => {
        if (isComplete) {
            setShowResult(true);
            console.log('Saving required salary to profile:', requiredSalary);
        }
    };

    const resetCalculator = () => {
        setExpenses({
            housing: '',
            transportation: '',
            food: '',
            personal: '',
            debtSavings: '',
            other: ''
        });
        setShowResult(false);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M3.4: Lifestyle Calculator 💰</h3>
                <h6>Translate your dreams into concrete financial needs. Calculate the minimum salary required to support your desired adult lifestyle.</h6>
            </div>
            <div className="p-6">
                <h5>Jump$tart's Reality Check is a super cool online tool that can help you think about your money and future! It's like a mini financial planner that shows
                    you how much money you'll need to live the way you want when you grow up.
                    With this tool, you can figure out things like how much you need for a place to live, food, clothes, transportation, fun activities, and even savings.
                    It gives you an idea of the annual income you'll need to keep up with your dream lifestyle.
                    When you know how much money you need, you can make better choices about what kind of job you want to have. If you have a specific lifestyle in mind,
                    you can look at the average salaries of the different careers you've researched to see if they match up. Sometimes, you might realize that you're okay
                    with changing your lifestyle a bit for a job that makes you really happy. Or, if you're torn between two careers that you like, but they pay different amounts,
                    understanding what you need for your lifestyle can really help you decide!
                    So, check out Jump$tart's Reality Check and start dreaming about your future while being smart about your money!</h5>
            </div>
            <h4 className='font-bold text-center hover:underline hover:cursor-pointer hover:text-ib-1'>
                <a href='https://www.jumpstart.org/education/reality-check/' target='_blank' rel='noreferrer'>https://www.jumpstart.org/education/reality-check/</a>
            </h4>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Housing
                            </label>
                            <p className="text-xs text-gray-500 mb-2">Rent/Mortgage, Utilities</p>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="text"
                                    value={expenses.housing}
                                    onChange={(e) => handleInputChange('housing', e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Transportation
                            </label>
                            <p className="text-xs text-gray-500 mb-2">Car Payment, Insurance, Gas, Public Transit</p>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="text"
                                    value={expenses.transportation}
                                    onChange={(e) => handleInputChange('transportation', e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Food
                            </label>
                            <p className="text-xs text-gray-500 mb-2">Groceries, Dining Out</p>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="text"
                                    value={expenses.food}
                                    onChange={(e) => handleInputChange('food', e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Personal
                            </label>
                            <p className="text-xs text-gray-500 mb-2">Clothing, Entertainment, Phone Bill, Hobbies</p>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="text"
                                    value={expenses.personal}
                                    onChange={(e) => handleInputChange('personal', e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Debt & Savings
                            </label>
                            <p className="text-xs text-gray-500 mb-2">Student Loans, Credit Card Payments, Savings</p>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="text"
                                    value={expenses.debtSavings}
                                    onChange={(e) => handleInputChange('debtSavings', e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Other
                            </label>
                            <p className="text-xs text-gray-500 mb-2">Miscellaneous or unique expenses (e.g., Pet Care)</p>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="text"
                                    value={expenses.other}
                                    onChange={(e) => handleInputChange('other', e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={handleSubmit}
                            disabled={!isComplete}
                            className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${isComplete
                                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Calculate Required Salary
                        </button>
                    </div>
                </div>

                {showResult && (
                    <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 md:p-8 border border-green-200">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Lifestyle Requirements</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                    <p className="text-sm text-gray-600 mb-1">Monthly Expenses</p>
                                    <p className="text-xl font-bold text-gray-800">{formatCurrency(totalMonthly)}</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                    <p className="text-sm text-gray-600 mb-1">Annual Expenses</p>
                                    <p className="text-xl font-bold text-gray-800">{formatCurrency(totalAnnual)}</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                    <p className="text-sm text-gray-600 mb-1">Tax Rate Applied</p>
                                    <p className="text-xl font-bold text-gray-800">25%</p>
                                </div>
                            </div>

                            <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                                <p className="text-lg md:text-xl font-semibold mb-2">
                                    To support your desired lifestyle, you need a gross annual salary of at least:
                                </p>
                                <p className="text-3xl md:text-4xl font-bold">
                                    {formatCurrency(requiredSalary)}
                                </p>
                            </div>

                            <div className="mt-6 flex justify-center gap-4">
                                <button
                                    onClick={resetCalculator}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                                >
                                    Reset Calculator
                                </button>
                                <button
                                    onClick={handleSubmitSalary}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Continue to Career Research
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Instructions */}
                {!showResult && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                        <p className="text-sm text-yellow-700">
                            <strong>Note:</strong> You must enter a value (even $0) in every field to calculate your required salary.
                            This figure accounts for typical tax deductions (25%) to show you the gross income needed.
                        </p>
                    </div>
                )}
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={nextButtonDisabledState}></CustomButton>
            </div>
        </div>
    );
};

export default LifestyleCalculator;
