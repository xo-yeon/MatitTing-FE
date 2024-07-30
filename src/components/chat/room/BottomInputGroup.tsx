import { MouseEvent, ReactElement } from 'react';
import TextInput from '@components/common/TextInput';
import styled from '@emotion/styled';
import { UseFormRegister } from 'react-hook-form';

const Wrapper = styled.form`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 1rem 2rem;
    background-color: #ddd;
`;

const SubmitButton = styled.button`
    width: 50px;
    border: none;
    border-radius: 10px;
    background-color: #efebec;
`;

interface BottomInputGroupProps {
    handleClickSubmit: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
    register: UseFormRegister<any>;
}

const BottomInputGroup = ({ register, handleClickSubmit }: BottomInputGroupProps) => (
    <Wrapper>
        <TextInput isBorderRadius={false} maxLength={20} {...register('message')} />
        <SubmitButton type="submit" onClick={handleClickSubmit}>
            전송
        </SubmitButton>
    </Wrapper>
);

BottomInputGroup.getLayout = (page: ReactElement) => {
    return <>{page}</>;
};

export default BottomInputGroup;
