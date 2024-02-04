import express from "express";


const authLogin = (req,res) => {
    console.log("req.user",req.user)
    if(req.user)
    {
        console.log(req.user)
        // const user ="ankit is tbi"
        res.status(200).json(req.user);
    }
    else
    {
        // const user ="ankit is tbi"
        res.status(400).json({ msg: "user not found"});
    }
}

export {authLogin};