import { ChangeEvent, MouseEvent, ReactElement } from 'react';
import TextInput from '@components/common/TextInput';
import styled from '@emotion/styled';
import { UseFormRegister } from 'react-hook-form';

const Wrapper = styled.form`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 1rem 2rem;
    background-color: #ddd;

    input: {
        height: 50px;
    }
`;

const ImageUploadButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    border: none;
    border-radius: 10px;
    background-color: #efebec;
    cursor: pointer;
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

const BottomInputGroup = ({ register, handleClickSubmit }: BottomInputGroupProps) => {
    // const handleClickSubmit = (e: MouseEvent<HTMLButtonElement>) => {};

    const handleChangeImageFile = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    return (
        <Wrapper>
            <TextInput
                placeholder="message"
                isBorderRadius={false}
                maxLength={20}
                {...register('message')}
            />
            <form id="form"></form>
            {/* <ImageUploadButton aria-label="upload picture" htmlFor="add_image">
        +
      </ImageUploadButton>
      <input
        hidden
        id="add_image"
        type="file"
        accept=".jpeg,.png"
        onChange={handleChangeImageFile}
      /> */}
            <SubmitButton type="submit" onClick={handleClickSubmit}>
                전송
            </SubmitButton>
        </Wrapper>
    );
};

BottomInputGroup.getLayout = (page: ReactElement) => {
    return <>{page}</>;
};

export default BottomInputGroup;
