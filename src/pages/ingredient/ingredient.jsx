import React from "react";

import Modal from "../../components/Modal/Modal";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";

import { HomePage } from "../home/home";
import { useHistory } from "react-router-dom";

export const IngredientPageModal = () => {
    const history = useHistory();
    const closeModal = () => {
        history.goBack();
    }

    return (
        <>
            <HomePage />
            <Modal title={'Детали инредиента'} close={closeModal}>
                <IngredientDetails />
            </Modal>
        </>
    )
}