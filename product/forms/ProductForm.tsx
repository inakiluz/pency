import React from "react";
import {useForm, Controller, FormContext} from "react-hook-form";
import {Flex, Stack, Text, Divider, FormLabel} from "@chakra-ui/core";

import {Product} from "../types";
import ProductVariantsInput, {
  validator as ProductVariantsInputValidator,
} from "../inputs/ProductVariantsInput";

import Input from "~/ui/inputs/Input";
import Select from "~/ui/inputs/Select";
import Textarea from "~/ui/inputs/Textarea";
import ImageInput from "~/ui/inputs/Image";
import SwitchInput from "~/ui/inputs/Switch";
import Price from "~/ui/inputs/Price";
import FormControl from "~/ui/controls/FormControl";

interface Props {
  defaultValues?: Partial<Product>;
  categories: Product["category"][];
  onSubmit: (values: Partial<Product>) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

const ProductForm: React.FC<Props> = ({defaultValues, children, onSubmit, categories}) => {
  const form = useForm<Partial<Product>>({defaultValues});
  const {handleSubmit: submit, errors, register, formState, setValue, control} = form;

  function handleSubmit(values: Partial<Product>) {
    const product = {...defaultValues, ...values};

    product.category = product.category.trim();
    product.price = Number(product.price);
    product.options = product.options || [];

    return onSubmit(product);
  }

  function setCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue("category", event.target.value);
    event.target.value = "";
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
      <FormContext {...form}>
        <form onSubmit={submit(handleSubmit)}>
          <Stack spacing={4}>
            <FormControl
              error={errors.image?.message}
              isInvalid={Boolean(errors.image)}
              name="image"
            >
              <Controller
                as={ImageInput}
                control={control}
                defaultValue=""
                name="image"
                quality="low"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.title && "Este campo es requerido"}
              help="Ej: Campera de cuero con apliques de piedras"
              label="Nombre"
              name="title"
            >
              <Input
                ref={register({required: true})}
                autoFocus
                name="title"
                placeholder="iPhone XS Max"
              />
            </FormControl>
            <FormControl
              error={errors.description && "La descripción no puede ser mayor a 280 caracteres"}
              help="Máximo 280 caracteres"
              label="Descripción"
              name="description"
            >
              <Textarea
                ref={register({maxLength: 280})}
                maxLength={280}
                name="description"
                placeholder="64GB mem. Silver."
                variant="filled"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.price && "Este campo es requerido"}
              label="Precio"
              name="price"
            >
              <Price
                ref={register({required: true})}
                name="price"
                placeholder="Precio"
                rounded="md"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.category?.message && "Este campo es requerido"}
              help="Ayudá a tus clientes a encontrar más rápido tus productos."
              label="Categoría"
              name="category"
            >
              <Flex>
                <Input ref={register({required: true})} name="category" placeholder="Categoría" />
                {Boolean(categories.length) && (
                  <Select
                    data-test-id="category-select"
                    flexShrink={2}
                    marginLeft={4}
                    variant="filled"
                    onChange={setCategory}
                  >
                    <option value="">Cargar</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                )}
              </Flex>
            </FormControl>
            <Stack isInline spacing={8}>
              <FormControl error={errors.featured?.message} name="featured">
                <Stack isInline alignItems="center">
                  <Controller
                    as={SwitchInput}
                    color="primary"
                    control={control}
                    defaultValue={false}
                    display="block"
                    id="featured"
                    name="featured"
                  />
                  <FormLabel cursor="pointer" fontWeight="normal" htmlFor="featured" padding={0}>
                    Destacar
                  </FormLabel>
                </Stack>
              </FormControl>
              <FormControl error={errors.available?.message} name="available">
                <Stack isInline alignItems="center">
                  <Controller
                    as={SwitchInput}
                    color="primary"
                    control={control}
                    display="block"
                    id="available"
                    name="available"
                  />
                  <FormLabel cursor="pointer" fontWeight="normal" htmlFor="available" padding={0}>
                    Disponible
                  </FormLabel>
                </Stack>
              </FormControl>
            </Stack>
            <Divider />
            <Text fontSize="xl" fontWeight={500}>
              Variantes
            </Text>
            <FormControl name="options">
              <Controller
                as={ProductVariantsInput}
                control={control}
                error={(errors.options as any)?.type}
                name="options"
                rules={{
                  validate: ProductVariantsInputValidator,
                }}
              />
            </FormControl>
          </Stack>
        </form>
      </FormContext>
    ),
  });
};

export default ProductForm;
