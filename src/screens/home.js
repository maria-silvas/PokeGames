import { StyleSheet, Text, View, Button, Dimensions, Image, ImageBackground } from 'react-native';
import { Appbar, Portal, Modal as PaperModal } from 'react-native-paper';
import Card, { ITEM_WIDTH, SLIDER_WIDTH } from './../components/card';
import { pokemonService } from '../services/pokemons/index';
import usePokemons from '../hooks/queries/pokemons/index';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CategoriesItem, Container, Section, Stack } from './../styles/components';
import { Card as PaperCard, Text as PaperText } from 'react-native-paper';
import { capitalizeFirstLetter } from './../utils/masks/capitalizeFirstLetter';
import { getColorByType } from './../utils/colors/getColorType';
import logo_icon_pokemon from '../../assets/logo_icon_pokemon.png'



export default function Home({ navigation }) {
    const { data: idPokemons, isLoadingIdPokemons } = usePokemons(undefined, undefined, {
        select: (data) => data.results.map(({ url }) => {
            return {
                id: url?.split('/')[6]
            }
        })
    });

    const allPokemons = useMemo(() => {
        let selectedData = [];
        idPokemons?.map(async ({ id }) => {
            const resPromise = await pokemonService.getPokemonById(id);
            selectedData.push({
                ...resPromise,
                url_image: resPromise.sprites.other['official-artwork'].front_default
            });
        });

        return selectedData;
    }, [idPokemons, isLoadingIdPokemons]);

    console.log('allPokemons', allPokemons);
    

    if (isLoadingIdPokemons) {
        return (
            <Container>
                <ActivityIndicator animating={true} color={MD2Colors.red800} />
            </Container>
        )
    }

    return (
        <Container>
            <Appbar.Header
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={logo_icon_pokemon}
                    style={{
                        width: '50px',
                        height: '50px',
                        resizeMode: 'contain',
                    }}
                />
            </Appbar.Header>
            <Section>
                <Stack
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    {
                        allPokemons?.map(({ id, name, base_experience, types, url_image }) => (
                            <Card
                                key={id}
                                name={name}
                                level={base_experience}
                                image={url_image}
                                type={types[0].type.name}
                                style={{
                                    width: '47%',
                                    height: '190px',
                                    margin: '1.5%',
                                    backgroundColor: getColorByType(types[0].type.name),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            />
                        ))
                    }
                </Stack>
            </Section>
        </Container>
    );
}
